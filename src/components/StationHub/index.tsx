import { CustomPIXIComponent } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';

const RADIUS = 20;

const getHubPath = (station: Coords, padding: string) => {
    const [x, y] = station;

    const pathMap = {
        'topLeft': [x + RADIUS * Math.cos(Math.radians(225)), y + RADIUS * Math.sin(Math.radians(225))],
        'top': [x, y - RADIUS],
        'topRight': [x + RADIUS * Math.cos(Math.radians(315)), y + RADIUS * Math.sin(Math.radians(315))],
        'right': [x + RADIUS, y],
        'bottomRight': [x + RADIUS * Math.cos(Math.radians(45)), y + RADIUS * Math.sin(Math.radians(45))],
        'bottom': [x, y + RADIUS],
        'bottomLeft': [x + RADIUS * Math.cos(Math.radians(135)), y + RADIUS * Math.sin(Math.radians(135))],
        'left': [x - RADIUS, y],
    }

}



export const StationHub = CustomPIXIComponent<
    PIXI.Graphics,
    {
        fill?: number;
        stroke?: number;
        path: number[];
        zIndex?: number;
    }
>(
    {
        customDisplayObject: () => new PIXI.Graphics(),
        customApplyProps: function (instance, oldProps, newProps) {
            const { path, fill = 0xffffff, stroke = 0x000000, zIndex = 0 } = newProps;

            instance.beginFill(fill);
            instance.lineStyle(1, stroke);
            instance.drawPolygon(path);
            instance.endFill();
            instance.closePath();

            instance.zIndex = zIndex;
        },
    },
    'StationHub'
);
