
export type priority = 'Low' | 'Medium' | 'High' | 'None' 

export interface todoType {
    id: string,
    msg_task: string,
    priority: priority,
    tags: string[],
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
        tags: string[],
        desc: string,
        date: string,
        isChecked: boolean
    }
}

export enum colorEnum {
    color1 = 'rgb(0, 200, 33)',
    color2 = 'rgb(156, 211, 38)',
    color3 = 'rgb(202, 182, 65)',
    color4 = 'rgb(255, 203, 0)',
    color5 = 'rgb(120, 75, 209)',
    color6 = 'rgb(162, 93, 220)',
    color7 = 'rgb(0, 134, 192)',
    color8 = 'rgb(87, 155, 252)',
    color9 = 'rgb(102, 204, 255)',
    color10 = 'rgb(187, 51, 84)',
    color11 = 'rgb(226, 68, 92)',
    color12 = 'rgb(255, 21, 138)',
    color13 = 'rgb(255, 90, 196)',
    color14 = 'rgb(255, 100, 46)',
    color15 = 'rgb(253, 171, 61)',
    color16 = 'rgb(127, 83, 71)',
    color17 = 'rgb(196, 196, 196)',
    color18 = 'rgb(128, 128, 128)',
    color19 = 'rgb(51, 51, 51)',
}