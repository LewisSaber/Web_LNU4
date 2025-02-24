
export default class EventHandler {
  constructor() {
    this.subscribers = {}
  }


  dispatchEvent(eventType, data) {
    if (this.subscribers[eventType]) {
      for (const subscriber in this.subscribers[eventType]) {
        let handler = this.subscribers[eventType][subscriber]
        handler.func(data, this, handler.options)
        if (handler.options.once) delete this.subscribers[eventType][subscriber]
      }
    }
    return this
  }

  
  removeEventListener(eventType, id) {
    if (this.subscribers[eventType]) {
      delete this.subscribers[eventType][id]
    }
    return this
  }

  addEventListener(eventType, func,  options = {}) {
    if (this.subscribers[eventType] == undefined) {
      this.subscribers[eventType] = []
    }

    this.subscribers[eventType].push({ func: func, options: options }) 

  
    return this
  }


  }


  function main(){
    let button = new EventHandler()

    button.addEventListener("click", (data) =>  console.log("clicked!","data:",data),{once:false})

    button.dispatchEvent("click", { text:"hi"})
    button.dispatchEvent("click", { text:"hi"})
  }
  main()