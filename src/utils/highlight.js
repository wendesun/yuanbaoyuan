/**
 * Created by mmwang on 2016/9/20.
 */
class Highlight {
  constructor(parser){
    this.parser = parser
  }

  parse(type){
    if(this.parser.hasOwnProperty(type)){
      return this.parser[type];
    }
    return this.parser.default
  }
}

export default Highlight;

//var highlight = new Highlight({10:'red', 20:'red', 30:'', default:''})

