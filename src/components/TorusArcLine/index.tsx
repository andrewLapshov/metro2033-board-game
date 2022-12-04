import { CustomPIXIComponent } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';
import scratches from '../../assets/old-paper.jpeg';

// const scratchesSprite = PIXI.Sprite.from(scratches);
// const filter = new PIXI.filters.ColorMatrixFilter();
//
// const tint = 0x8f1120;
// const r = (tint >> 16) & 0xff;
// const g = (tint >> 8) & 0xff;
// const b = tint & 0xff;
// filter.matrix[0] = r / 255;
// filter.matrix[6] = g / 255;
// filter.matrix[12] = b / 255;

// const { matrix } = filter;
//
// const count = 10;
//
// matrix[1] = Math.sin(count) * 3;
// matrix[2] = Math.cos(count);
// matrix[3] = Math.cos(count) * 1.5;
// matrix[4] = Math.sin(count / 3) * 2;
// matrix[5] = Math.sin(count / 2);
// matrix[6] = Math.sin(count / 4);

export const TorusArc = CustomPIXIComponent<
    PIXI.Graphics,
    {
        x: number;
        y: number;
        innerRadius: number;
        outerRadius: number;
        startArc: number;
        endArc: number;
        fill: number;
        zIndex: number;
    }
>(
    {
        customDisplayObject: () => new PIXI.Graphics(),
        customApplyProps: function (instance, oldProps, newProps) {
            const { fill, x, y, innerRadius, outerRadius, startArc, endArc, zIndex } = newProps;

            instance.beginFill(fill);
            instance.lineStyle(1, 0x0000);
            // instance.beginTextureFill({ texture: scratchesSprite.texture });
            instance.drawTorus!(x, y, innerRadius, outerRadius, startArc, endArc);
            instance.endFill();

            instance.zIndex = zIndex;
            // instance.filters = [filter];
        },
    },
    'TorusArc'
);
