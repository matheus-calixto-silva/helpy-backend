import { Router } from 'express';
import { createSkill } from '../useCases/skills/createSkill';
import { updateSkill } from '../useCases/skills/updateSkill';
import { removeSkill } from '../useCases/skills/removeSkill';
import { listSkills } from '../useCases/skills/listSkills';
import { getSkillById } from '../useCases/skills/getSkillById';

export const skillsRouter = Router();

skillsRouter.get('/skills', listSkills);

skillsRouter.post('/skills', createSkill);

skillsRouter.get('/skills/:skillId', getSkillById);

skillsRouter.put('/skills/:skillId', updateSkill);

skillsRouter.delete('/skills/:skillId', removeSkill);
