/**
 * Created by mmwang on 2016/9/20.
 */
function Limitwords (limit, str) {
  if(typeof(str) == 'undefined'){
    return limit;
  }
  return limit - String(str).length;
}

export  default  Limitwords
