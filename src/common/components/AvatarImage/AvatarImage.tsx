import classnames from 'classnames'
import React from 'react'

import { MakeRequired } from 'app/types'

import styles from './AvatarImage.module.scss'

enum SelectableTypes {
    List = 'list',
    Profile = 'profile',
    Timeline = 'timeline',
}

type AIProps = Omit<MakeRequired<JSX.IntrinsicElements['img'], 'alt' | 'src'>, 'className'> & {
    type: SelectableTypes
}

const AvatarImage = ({ alt, type, ...rest }: AIProps) => {
    return <img {...rest} alt={alt} className={classnames(styles.ava, styles[type])} />
}

export { SelectableTypes }
export default AvatarImage
