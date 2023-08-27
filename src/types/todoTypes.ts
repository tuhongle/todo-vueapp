
export type priority = 'Low' | 'Medium' | 'High' | 'None' 

export interface todo {
    id: string,
    msg_task: string,
    priority: priority,
    tags: string[],
    desc: string,
    date: string,
    isChecked: boolean
}

export interface docType {
    id: string,
    data(): {
        msg_task: string,
        priority: priority,
        tags: string[],
        desc: string,
        date: string,
        isChecked: boolean
    }
}