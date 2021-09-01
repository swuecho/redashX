import { genRecordID } from "../survey"

test('survey record id', () => {
    expect(genRecordID().length).toBe(10)
})
