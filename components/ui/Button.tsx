import React from 'react';
import cn from 'classnames';

import classes from './button.module.scss';

type Props = {
    classType: string;
    type: 'button' | 'submit';
    value: string;
    onClick?: (e: React.MouseEvent) => void;
    disabled?: boolean;
};

const Button: React.FC<Props> = ({ classType, type, value, onClick, disabled }) => {
    switch (classType) {
        case 'primary':
            return (
                <button type={type} className={cn(classes.button, classes['button__primary'])}>
                    {value}
                </button>
            );
        case 'secondary':
            return (
                <button
                    type={type}
                    className={
                        disabled
                            ? cn(classes.button, classes['button__secondary--disabled'])
                            : cn(classes.button, classes['button__secondary'])
                    }
                    onClick={onClick}
                    disabled={disabled}
                >
                    {disabled ? 'Added in cart' : value}
                </button>
            );
        case 'secondary--small':
            return (
                <button
                    type={type}
                    className={cn(classes.button, classes['button__secondary--small'])}
                    onClick={onClick}
                >
                    {value}
                </button>
            );

        case 'primary-big':
            return (
                <button type={type} className={cn(classes.button, classes['button__primary--big'])} onClick={onClick}>
                    {value}
                </button>
            );
        default:
            return (
                <button type={type} className={classes.button}>
                    {value}
                </button>
            );
    }
};

export default Button;
