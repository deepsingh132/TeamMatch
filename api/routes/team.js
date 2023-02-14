import { Router } from "express";
import Team from "../models/Team.js";
import {
  createTeam,
  deleteTeam,
  getTeam,
  getTeams,
  updateTeam,
} from "../controllers/team.js";

const router = Router();

//Create Team

router.post("/:id", createTeam);

//Updates a team
router.put("/:id", updateTeam);

//Deletes a team

router.delete("/:id", deleteTeam);

//Get Team
router.get("/:id", getTeam);

// Get all teams
router.get("/", getTeams);

export default router;
