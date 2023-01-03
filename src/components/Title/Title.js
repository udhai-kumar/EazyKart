import React from 'react'

const Title = (props) => {
    document.title = "EazyKart -" + props.title;

  return (
    <div className="w-100">{props.children}</div>
  )
}

export default Title