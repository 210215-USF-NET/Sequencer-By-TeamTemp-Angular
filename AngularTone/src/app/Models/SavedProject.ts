import { Track } from "./Track";
import { UserProject } from "./UserProject";

//needs to be finished -Tate
export interface SavedProject
{
    ID: number,
    projectName: string,
    BPM: number,
    userProjects: UserProject[],
    tracks: Track[]
}