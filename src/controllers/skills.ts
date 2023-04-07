import { Router } from 'express';
import { createSkill } from '../useCases/skills/createSkill';
import { updateSkill } from '../useCases/skills/updateSkill';
import { removeSkill } from '../useCases/skills/removeSkill';
import { listSkills } from '../useCases/skills/listSkills';
import { getSkillById } from '../useCases/skills/getSkillById';

import { auth, authAdmin } from '../utils/middleware';

export const skillsRouter = Router();

skillsRouter.get('/skills', auth, listSkills);

skillsRouter.post('/skills', authAdmin, createSkill);

skillsRouter.get('/skills/:skillId', auth, getSkillById);

skillsRouter.put('/skills/:skillId', authAdmin, updateSkill);

skillsRouter.delete('/skills/:skillId', authAdmin, removeSkill);
