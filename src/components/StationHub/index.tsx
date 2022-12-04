import { CustomPIXIComponent } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';
import { ComponentProps, ReactNode } from 'react';
import { Station } from '../Station';

const RADIUS = 25;

type Path = 'topLeft' | 'top' | 'topRight' | 'right' | 'bottomRight' | 'bottom' | 'bottomLeft' | 'left';

const getHubPath = (station: Coords, paddings: Path[]) => {
    const [x, y] = station;

    const pathCoordsMap: { [key in Path]: Coords } = {
        topLeft: [x + RADIUS * Math.cos(Math.radians(225)), y + RADIUS * Math.sin(Math.radians(225))],
        top: [x, y - RADIUS],
        topRight: [x + RADIUS * Math.cos(Math.radians(315)), y + RADIUS * Math.sin(Math.radians(315))],
        right: [x + RADIUS, y],
        bottomRight: [x + RADIUS * Math.cos(Math.radians(45)), y + RADIUS * Math.sin(Math.radians(45))],
        bottom: [x, y + RADIUS],
        bottomLeft: [x + RADIUS * Math.cos(Math.radians(135)), y + RADIUS * Math.sin(Math.radians(135))],
        left: [x - RADIUS, y],
    };

    const pathMap: { [key in Path]: number } = {
        topLeft: Math.radians(225),
        top: Math.radians(270),
        topRight: Math.radians(315),
        right: Math.radians(0),
        bottomRight: Math.radians(45),
        bottom: Math.radians(90),
        bottomLeft: Math.radians(135),
        left: Math.radians(180),
    };

    return {
        arcRadians: [pathMap[paddings[0]], pathMap[paddings[1]]],
        arcCoords: [pathCoordsMap[paddings[0]], pathCoordsMap[paddings[1]]],
    };
};

export const StationHubComponent = CustomPIXIComponent<
    PIXI.Graphics,
    {
        fill?: number;
        stroke?: number;
        path?: number[];
        zIndex?: number;
        pathMap?: { coords: Coords; path: [Path, Path] }[];
        children?: ReactNode;
    }
>(
    {
        customDisplayObject: () => new PIXI.Graphics(),
        customApplyProps: function (instance, oldProps, newProps) {
            const { path, fill = 0xffffff, stroke = 0x000000, zIndex = 0, pathMap, children } = newProps;

            if (!pathMap && path) {
                instance.beginFill(fill);
                instance.lineStyle(1, stroke);
                instance.drawPolygon(path);
                instance.endFill();
                instance.closePath();

                instance.zIndex = zIndex;
            } else if (pathMap) {
                let prevStartPoint: Coords | null = null;
                let lastLinePoint: Coords | null = null;

                instance.beginFill(fill);
                instance.lineStyle(1, stroke);

                pathMap.forEach(({ coords, path }, idx) => {
                    const { arcRadians, arcCoords } = getHubPath(coords, path);
                    const [arcStart, arcEnd] = arcRadians;
                    const [arcStartCoords, arcEndCoords] = arcCoords;

                    if (idx === 0) {
                        lastLinePoint = arcStartCoords;
                    } else if (prevStartPoint) {
                        instance.lineTo(arcStartCoords[0], arcStartCoords[1]);
                    }

                    prevStartPoint = arcEndCoords;

                    instance.arc(coords[0], coords[1], 25, arcStart, arcEnd);
                });

                if (lastLinePoint && prevStartPoint) {
                    instance.lineTo(lastLinePoint[0], lastLinePoint[1]);
                }

                instance.closePath();
                instance.endFill();

                instance.zIndex = zIndex;
            }
        },
    },
    'StationHub'
);

export const StationHub = (props: ComponentProps<typeof StationHubComponent>) => {
    return (
        <>
            <StationHubComponent {...props} />
            {props.pathMap?.map(({ coords }) => (
                <Station
                    key={`${coords[0]}${coords[1]}`}
                    x={coords[0]}
                    y={coords[1]}
                    fill={0x8f1120}
                    zIndex={3}
                />
            ))}
        </>
    );
};
