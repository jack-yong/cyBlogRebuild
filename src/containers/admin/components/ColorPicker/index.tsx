import React, { useState } from 'react';
import { SketchPicker } from 'react-color';
import s from './index.mod.scss';

// eslint-disable-next-line @typescript-eslint/ban-types
export const ColorPicker: React.FC<{ value?: string; onChange?: Function }> = ({
    value,
    onChange
}) => {
    const [displayCP, setDisplayCP] = useState(false);
    const [color, setColor] = useState(value ?? '#000');
    function colorPickerClose() {
        setDisplayCP(false);
    }

    // eslint-disable-next-line
    function colorOnChange(color: any) {
        setColor(color.hex);
        setTimeout(() => {
            onChange?.(color.hex);
        });
    }

    function colorClick() {
        setDisplayCP(!displayCP);
    }

    return (
        <>
            <div className={s.swatch} onClick={colorClick}>
                <div className={s.color} style={{ backgroundColor: `${color}` }} />
            </div>
            {displayCP && (
                <div className={s.popover} onClick={colorPickerClose}>
                    <div className={s.cover} style={{ backgroundColor: `${color}` }}>
                        <SketchPicker color={color && color} onChange={colorOnChange} />
                    </div>
                </div>
            )}
        </>
    );
};
