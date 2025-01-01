import React from 'react'
import { SpacerProps, Spaces } from './spacer-types'
import { spacing } from './spacer-utils';

const Spacer = (props: SpacerProps) => {
  return (
    <section className={`flex justify-center items-center ${spacing(props.space)}`}>{props.children}</section>
  )
}

export default Spacer