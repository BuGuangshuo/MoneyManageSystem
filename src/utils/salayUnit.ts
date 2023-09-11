function numConvert(num: any) {
    if (num >= 100000) {
      num = `${parseInt(num / 1000) / 10}W`;
    } else if (num >= 1000) {
      num = `${parseInt(num / 100) / 10}K`;
    }
    return num;
}

export default numConvert;