import { collection, getDocs, getFirestore, query, SnapshotOptions, where } from "firebase/firestore"
import React from "react"

type ProjectProps = {
  projects: Project[],
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>,
  loading: boolean;
}

async function getAllUserProjects (userId?: string) {
  if (!userId) return []
  const projects: Project[] = []
  const q = query(collection(getFirestore(), 'projects'), where("userId", "==", userId)).withConverter(projectConverter)
  const docs = await getDocs(q)
  docs.forEach(doc => projects.push({...doc.data(), id: doc.id}))
  return projects
}

class Project {
  title: string;
  description: string;
  isStared: boolean;
  userId: string;
  lists: string[]
  id: string;

  constructor(title: string, description: string, isStared: boolean, userId: string, lists: string[], id: string) {
    this.title = title
    this.description = description
    this.isStared = isStared
    this.userId = userId
    this.lists = lists
    this.id = id || ''
  }

}

const projectConverter = {
  toFirestore: (project: Project) => {
    return {
      title: project?.title,
      description: project?.description || '',
      isStared: project?.isStared || false,
      userId: project.userId,
      lists: project.lists || []
    }
  },
  fromFirestore: (snapshot: any, options: SnapshotOptions) => {
    const data = snapshot.data(options)
    return new Project(data.title, data.description, data.isStared, data.userId, data.lists, snapshot.id)
  }
}

export { getAllUserProjects, projectConverter, Project };
export type { ProjectProps };
