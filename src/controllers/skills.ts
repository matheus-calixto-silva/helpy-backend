import { createSkill } from '@useCases/skills/createSkill';
import { getSkillById } from '@useCases/skills/getSkillById';
import { listSkills } from '@useCases/skills/listSkills';
import { removeSkill } from '@useCases/skills/removeSkill';
import { updateSkill } from '@useCases/skills/updateSkill';
import { Router } from 'express';

import { auth, authAdmin } from '@middlewares/autheticationMiddleware';

export const skillsRouter = Router();

skillsRouter.get('/skills', auth, listSkills);

skillsRouter.post('/skills', authAdmin, createSkill);

skillsRouter.get('/skills/:skillId', auth, getSkillById);

skillsRouter.put('/skills/:skillId', authAdmin, updateSkill);

skillsRouter.delete('/skills/:skillId', authAdmin, removeSkill);
