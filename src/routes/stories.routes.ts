import express from 'express';
const storiesRoute = express.Router()

import { getStories, getStory, createStory, updateStory, deleteStory } from '../controller/stories.controller';
import { upload } from '../lib/multer';


storiesRoute.get('/', getStories);
storiesRoute.get('/:id', getStory);
storiesRoute.post('/',upload.single('file'), createStory);
storiesRoute.put('/:id', updateStory);
storiesRoute.delete('/:id', deleteStory);

export default storiesRoute;

