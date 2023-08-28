
export type priority = 'Low' | 'Medium' | 'High' | 'None' 

export interface todoType {
    id: string,
    msg_task: string,
    priority: priority,
    tags: tag[],
    desc: string,
    date: string,
    isChecked: boolean
}

export interface tag {
    title: string,
    color: string
}

export interface docType {
    id: string,
    data(): {
        msg_task: string,
        priority: priority,
        tags: tag[],
        desc: string,
        date: string,
        isChecked: boolean
    }
}