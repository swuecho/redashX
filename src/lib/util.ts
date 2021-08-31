// hexDay := strconv.FormatInt(epoch/86400, 16)

import { nanoid } from "nanoid";

export function epoch2ID(epoch: number): string {
    let hexDay = Math.floor(epoch / 86400).toString(16);
    let lens = hexDay.length

    if (lens > 5) {
        let current_nanoid = nanoid(5)
        return hexDay.substring(0, 5) + current_nanoid
    } else {
        let current_nanoid = nanoid(10 - lens)
        return hexDay + current_nanoid
    }
}