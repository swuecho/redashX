import {
    epoch2ID
} from './../lib/util'

//  {"time1", args{1643243543}, "4a4bxdwuKU"},
// {"time2", args{3397334400}, "9999ObkriV"},
test('epoch2ID', () => {
    let test1 = epoch2ID(1643243543);
    expect(test1.substring(0, 4)).toBe('4a4b');
    expect(test1.length).toBe(10);

    expect(epoch2ID(3397334400).substring(0, 4)).toBe('9999');
    expect(epoch2ID(3397334400).length).toBe(10);
})
