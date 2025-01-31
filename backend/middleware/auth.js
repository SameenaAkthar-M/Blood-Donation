import jwt from "jsonwebtoken"

export const authMiddleware=(req,res,next)=>{
  const token=req.header("Authorization");

  if(!token){
    return res.json({
      success:false,
      message:"No token provided"
    })
  }
  try{
    const verified=jwt.verify(token,process.env.JWT_SECRET);
    req.user=verified;
    next();
  } catch(error){
    res.json({
      success:false,
      message: "Invalid Token"
    })
  }
}