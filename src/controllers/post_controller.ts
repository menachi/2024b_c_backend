import Post, { IPost } from "../models/post_model";
import BaseController from "./base_controller";

const PostController = new BaseController<IPost>(Post);

export default PostController;