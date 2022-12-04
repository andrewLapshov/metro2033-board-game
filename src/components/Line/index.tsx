import { CustomPIXIComponent } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';
import { LINE_WIDTH } from '../App';

export const Line = CustomPIXIComponent<
    PIXI.Graphics,
    {
        x?: number;
        y?: number;
        fill: number;
        zIndex?: number;
        path: [number, number][];
    }
>(
    {
        customDisplayObject: () => new PIXI.Graphics(),
        customApplyProps: function (instance, oldProps, newProps) {
            const { x, y, path, fill, zIndex = 0 } = newProps;

            instance.lineStyle(LINE_WIDTH, 0x0000);

            if (x && y) {
                instance.moveTo(x, y);
            } else {
                instance.moveTo(path[0][0], path[0][1]);
            }

            path.forEach(([x, y]) => {
                instance.lineTo(x, y);
            });

            instance.lineStyle(LINE_WIDTH - 1, fill);

            if (x && y) {
                instance.moveTo(x, y);
            } else {
                instance.moveTo(path[0][0], path[0][1]);
            }

            path.forEach(([x, y]) => {
                instance.lineTo(x, y);
            });

            // instance.closePath();
            // instance.endFill();

            instance.zIndex = zIndex;
        },
    },
    'Line'
);
