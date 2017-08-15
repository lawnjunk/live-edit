
export default (handlers) => {
  let recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;

  recognition.onstart = handlers.onStart || (() => {})
  recognition.onerror = handlers.onError || (() => {})
  recognition.onresult = (e) => {
    let {resultIndex} = e
    let result = e.results[resultIndex]
    let [data] = result
    if(result.isFinal)
      return handlers.onNext(data)
    return handlers.onFragment(data)
  }

  return {
    start: () => {
      recognition.start()
    },
    stop: () => {
      recognition.stop()
    }
  }
}
