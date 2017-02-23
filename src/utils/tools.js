class sortRule {
  current = 1
  constructor(origin, change) {
    this.origin = origin
    this.change = change
  }

  get status (){
    if(this.current){
      return this.origin
    } else {
      return this.change
    }
  }

  change () {
    this.current = this.current ? 0 : 1;
  }
}

export default sortRule
