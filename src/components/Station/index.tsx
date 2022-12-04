import { CustomPIXIComponent } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';

export const Station = CustomPIXIComponent<
    PIXI.Graphics,
    {
        x?: number;
        y?: number;
        coords?: Coords;
        radius?: number;
        fill: number;
        zIndex: number;
    }
>(
    {
        customDisplayObject: () => new PIXI.Graphics(),
        customApplyProps: function (instance, oldProps, newProps) {
            const { x: dX, y: dY, coords, radius = 20, fill, zIndex } = newProps;

            const x = dX ?? coords?.[0];
            const y = dY ?? coords?.[1];

            if (!x || !y) {
                return;
            }

            instance.beginFill(0xffffff);
            instance.lineStyle(1, 0x0000);
            instance.drawCircle(x, y, radius);
            instance.endFill();

            instance.drawCircle(x, y, radius / 2);
            instance.beginFill(fill);
            instance.drawTorus!(x, y, radius - 15, radius - 7);
            instance.endFill();

            instance.zIndex = zIndex;
        },
    },
    'Station'
);
