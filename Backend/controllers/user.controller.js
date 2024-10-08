import bcrypt from 'bcrypt';
import errorHandler from '../utils/errorHandler';
import User from '../models/user.model';

export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.id)
      return next(errorHandler(401, 'You can only update your own account!'));
    try {
      if (req.body.password) {
        req.body.password = bcrypt.hash(req.body.password, 10);
      }
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            avatar: req.body.avatar,
          },
        },
        { new: true }
      );
      const { password, ...rest } = updatedUser._doc;
      res.status(200).json(rest);
    } catch (error) {
      next(error);
    }
  };

  export const deleteUser=async (req,res,next)=>{
    if(req.user.id !== req.params.id) next(errorHandler(400,"User not authorized"));

    try{
        await User.findByIdAndDelete(req.params.id);
        res.clearCookie('access_token');
        res.status(200).json({
            success:true,
            message:"user deleted successfully"
        })
        }
     catch(error){
        next(error.message);
    }
  }