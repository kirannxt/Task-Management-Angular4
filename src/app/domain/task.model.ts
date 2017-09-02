
export interface Task {

    id?: string;
    desc: string;
    completed: boolean;
    priority: number;
    dueDate?: Date;
    remind?: Date;
    createDate: Date;
    remark?: string;
    ownerId?: string;
    participantIds: string[];
    taskListId: string;
}