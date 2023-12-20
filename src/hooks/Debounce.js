import React from 'react'
import { useRef } from 'react';

const useDebounce = (callBack) => {
  
    let timerId = useRef(undefined);

    return function(){
        clearTimeout(timerId.current);
        timerId.current = setTimeout(callBack , 1000);
    }
}

export default useDebounce;
