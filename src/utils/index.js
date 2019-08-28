export const transalteDuration = (duration) => {
    var h = Math.floor(duration / 3600);
    var m = Math.floor((duration / 60 % 60));
    var s = Math.floor((duration % 60));
    let durationStr = s + "s";
    if (m > 0) {
    durationStr = m + "m" + durationStr;
    }
    if (h > 0) {
    durationStr = h + "H" + durationStr;
    }
    return durationStr;
}