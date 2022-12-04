import { Stage } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';
// import { Graphics  } from '@pixi/graphics';
import '@pixi/graphics-extras';
import { Station } from '../Station';
import { TorusArc } from '../TorusArcLine';
import { Fragment, useEffect, useRef } from 'react';
import { Container } from '../Container';
import { Line } from '../Line';
import { getDistance } from '../../utils/getDistance';
import { StationHub } from '../StationHub';

const width = document.documentElement.clientWidth;
const height = document.documentElement.clientHeight;
const center = [width / 2, height / 2];

export const LINE_WIDTH = 20;
const TORUS_RADIUS = 400;
const TORUS_LINE_CENTER = TORUS_RADIUS - LINE_WIDTH / 2;

const blurFilter1 = new PIXI.filters.BlurFilter(1);
blurFilter1.blendMode = PIXI.BLEND_MODES.SOFT_LIGHT;

Math.radians = (degrees: number) => (degrees * Math.PI) / 180;
Math.percent = (value: number, percent: number) => (value / 100) * percent;

const line8 = [
    {
        startArc: Math.radians(-45),
        endArc: Math.radians(135),
    },
    {
        startArc: Math.radians(135),
        endArc: Math.radians(225),
    },
    {
        startArc: Math.radians(225),
        endArc: Math.radians(315),
    },
];

const bibliotekaKurskaya = Math.sqrt(Math.pow(TORUS_LINE_CENTER, 2) - Math.pow(60, 2));

const barrikadnaya: [number, number] = [
    center[0] + TORUS_LINE_CENTER * Math.cos(Math.radians(192)),
    center[1] + TORUS_LINE_CENTER * Math.sin(Math.radians(192)),
];
const oktyabrskaya: [number, number] = [
    center[0] + TORUS_LINE_CENTER * Math.cos(Math.radians(110)),
    center[1] + TORUS_LINE_CENTER * Math.sin(Math.radians(110)),
];
const tretyakovskaya: [number, number] = [
    oktyabrskaya[0] + TORUS_LINE_CENTER * Math.cos(Math.radians(105)),
    oktyabrskaya[1] + TORUS_LINE_CENTER * Math.sin(Math.radians(105)),
];
const kurskayaHanza: [number, number] = [center[0] + bibliotekaKurskaya, center[1] + 60];
const sretenskiyBulvar: [number, number] = [
    center[0] - 60 + (bibliotekaKurskaya + 60) / 2,
    center[1] + 60 - (bibliotekaKurskaya + 60) / 2,
];
const prospektMira: [number, number] = [
    center[0] + TORUS_LINE_CENTER * Math.cos(Math.radians(300)),
    center[1] + TORUS_LINE_CENTER * Math.sin(Math.radians(300)),
];
const taganskaya: [number, number] = [
    center[0] + 75 + TORUS_LINE_CENTER * Math.cos(Math.radians(45)),
    barrikadnaya[1] + TORUS_LINE_CENTER * Math.sin(Math.radians(45)),
];
const serpuhovskaya: [number, number] = [
    center[0] + TORUS_LINE_CENTER * Math.cos(Math.radians(87)),
    center[1] + TORUS_LINE_CENTER * Math.sin(Math.radians(87)),
];
const paveletskaya: [number, number] = [
    center[0] + TORUS_LINE_CENTER * Math.cos(Math.radians(75)),
    center[1] + TORUS_LINE_CENTER * Math.sin(Math.radians(75)),
];
const kievskayaHanza: [number, number] = [
    center[0] + TORUS_LINE_CENTER * Math.cos(Math.radians(154)),
    center[1] + TORUS_LINE_CENTER * Math.sin(Math.radians(154)),
];

const App = () => {
    return (
        <Stage
            options={{
                backgroundColor: 0xffffff,
                width,
                height,
                antialias: true,
            }}
            style={{
                position: 'absolute',
            }}
        >
            <Container sortableChildren={true}>
                {line8.map(({ startArc, endArc }, idx) => {
                    return (
                        <Fragment key={idx}>
                            <TorusArc
                                x={center[0]}
                                y={center[1]}
                                outerRadius={TORUS_RADIUS}
                                innerRadius={TORUS_RADIUS - LINE_WIDTH}
                                startArc={startArc}
                                endArc={endArc}
                                fill={0x8f1120}
                                zIndex={1}
                            />
                            <Station
                                x={center[0] + TORUS_LINE_CENTER * Math.cos(endArc)}
                                y={center[1] + TORUS_LINE_CENTER * Math.sin(endArc)}
                                fill={0x8f1120}
                                zIndex={3}
                            />
                        </Fragment>
                    );
                })}
                {/* Red line */}
                <Line
                    x={center[0] + TORUS_LINE_CENTER * Math.cos(Math.radians(135)) - 100}
                    y={center[1] + TORUS_LINE_CENTER * Math.sin(Math.radians(135)) + 100}
                    fill={0xd6073b}
                    path={[
                        [
                            center[0] + TORUS_LINE_CENTER * Math.cos(Math.radians(-45)) + 100,
                            center[1] + TORUS_LINE_CENTER * Math.sin(Math.radians(-45)) - 100,
                        ],
                    ]}
                />
                <Station
                    x={center[0] + TORUS_LINE_CENTER * Math.cos(Math.radians(135)) + 30}
                    y={center[1] + TORUS_LINE_CENTER * Math.sin(Math.radians(135)) - 30}
                    fill={0x8f1120}
                    zIndex={3}
                />
                <Station
                    x={center[0] + TORUS_LINE_CENTER * Math.cos(Math.radians(135)) + 70}
                    y={center[1] + TORUS_LINE_CENTER * Math.sin(Math.radians(135)) - 70}
                    fill={0x8f1120}
                    zIndex={3}
                />

                {/* Green line */}
                <Line
                    x={center[0] + TORUS_LINE_CENTER * Math.cos(Math.radians(225)) - 100}
                    y={center[1] + TORUS_LINE_CENTER * Math.sin(Math.radians(225)) - 100}
                    fill={0x139f0e}
                    path={[
                        [center[0] + 30, center[1] + 30],
                        [center[0] + 30, center[1] + 300],
                        [
                            center[0] + 30 + 200 * Math.cos(Math.radians(45)),
                            center[1] + 310 + 200 * Math.cos(Math.radians(45)),
                        ],
                    ]}
                />
                <StationHub
                    zIndex={2}
                    fill={0xffffff}
                    path={[
                        center[0] - 125,
                        barrikadnaya[1],
                        center[0] - 100,
                        barrikadnaya[1] - 40,
                        center[0] - 75,
                        barrikadnaya[1],
                    ]}
                />
                <Station x={center[0] - 125} y={barrikadnaya[1]} fill={0x8f1120} zIndex={3} />
                <Station x={center[0] - 100} y={barrikadnaya[1] - 40} fill={0x8f1120} zIndex={3} />
                <Station x={center[0] - 75} y={barrikadnaya[1]} fill={0x8f1120} zIndex={3} />

                <Station x={center[0] + 30} y={center[1] + 240} fill={0x8f1120} zIndex={3} />
                <Station x={center[0] + 30} y={center[1] + 290} fill={0x8f1120} zIndex={3} />
                <Station x={center[0] + 70} y={center[1] + 265} fill={0x8f1120} zIndex={3} />
                <StationHub
                    zIndex={2}
                    fill={0xffffff}
                    path={[
                        center[0] + 30,
                        center[1] + 240,
                        center[0] + 30,
                        center[1] + 290,
                        center[0] + 70,
                        center[1] + 265,
                    ]}
                />
                <Station x={paveletskaya[0]} y={paveletskaya[1]} fill={0x8f1120} zIndex={3} />
                <Station
                    x={paveletskaya[0] + 30}
                    y={paveletskaya[1] + 30}
                    fill={0x8f1120}
                    zIndex={3}
                />

                {/* Yellow line */}
                <Line
                    x={center[0] + 70}
                    y={center[1] + 265}
                    fill={0xfcc343}
                    path={[[center[0] + 600, center[1] + 265]]}
                />

                {/* Pink line */}
                <Line
                    fill={0xfa4857}
                    path={[
                        [
                            barrikadnaya[0] + TORUS_LINE_CENTER * Math.cos(Math.radians(225)),
                            barrikadnaya[1] + TORUS_LINE_CENTER * Math.sin(Math.radians(225)),
                        ],
                        [barrikadnaya[0], barrikadnaya[1]],
                        [center[0] + 75, barrikadnaya[1]],
                        [
                            center[0] + 75 + TORUS_LINE_CENTER * Math.cos(Math.radians(45)) + 200,
                            barrikadnaya[1] + TORUS_LINE_CENTER * Math.sin(Math.radians(45)) + 200,
                        ],
                    ]}
                />
                <Station
                    x={barrikadnaya[0] - 45}
                    y={barrikadnaya[1] - 45}
                    fill={0x8f1120}
                    zIndex={3}
                />
                <Station
                    x={barrikadnaya[0] - 90}
                    y={barrikadnaya[1] - 90}
                    fill={0x8f1120}
                    zIndex={3}
                />
                <Station x={barrikadnaya[0]} y={barrikadnaya[1]} fill={0x8f1120} zIndex={3} />
                <Station x={barrikadnaya[0] + 45} y={barrikadnaya[1]} fill={0x8f1120} zIndex={3} />
                <Station x={center[0] + 75} y={barrikadnaya[1]} fill={0x8f1120} zIndex={3} />
                <Station x={center[0] + 105} y={barrikadnaya[1] + 30} fill={0x8f1120} zIndex={3} />

                <Station x={taganskaya[0]} y={taganskaya[1]} fill={0x8f1120} zIndex={3} />
                <Station x={taganskaya[0] - 35} y={taganskaya[1] + 35} fill={0x8f1120} zIndex={3} />
                <Station x={center[0] + 350} y={center[1] + 265} fill={0x8f1120} zIndex={3} />
                <StationHub
                    zIndex={2}
                    fill={0xffffff}
                    path={[
                        taganskaya[0],
                        taganskaya[1],
                        taganskaya[0] - 35,
                        taganskaya[1] + 35,
                        center[0] + 350,
                        center[1] + 265,
                    ]}
                />

                {/*<Station*/}
                {/*    x={center[0] - TORUS_LINE_CENTER}*/}
                {/*    y={center[1] - 75}*/}
                {/*    fill={0x8f1120}*/}
                {/*    zIndex={3}*/}
                {/*/>*/}

                {/* Gray line */}
                <Line
                    fill={0xe1e3dc}
                    path={[
                        [serpuhovskaya[0], height],
                        [serpuhovskaya[0], serpuhovskaya[1]],
                        [center[0] - 100, center[1] + 265],
                        [center[0] - 100, center[1] - 115],
                        [
                            center[0] + 5,
                            kurskayaHanza[1] +
                                (TORUS_LINE_CENTER + 50) * Math.sin(Math.radians(225)),
                        ],
                    ]}
                />
                <Station
                    x={center[0] + 5}
                    y={kurskayaHanza[1] + (TORUS_LINE_CENTER + 50) * Math.sin(Math.radians(225))}
                    fill={0x8f1120}
                    zIndex={3}
                />
                <Station x={serpuhovskaya[0]} y={serpuhovskaya[1]} fill={0x8f1120} zIndex={3} />
                <Station
                    x={serpuhovskaya[0]}
                    y={serpuhovskaya[1] + 45}
                    fill={0x8f1120}
                    zIndex={3}
                />

                {/* Center */}
                <Station x={center[0]} y={center[1]} fill={0x8f1120} zIndex={3} />
                <Station x={center[0] + 30} y={center[1] + 30} fill={0x8f1120} zIndex={3} />
                <Station x={center[0] + 60} y={center[1] + 60} fill={0x8f1120} zIndex={3} />

                {/* Polis */}
                <Station x={center[0] - 60} y={center[1] + 60} fill={0x8f1120} zIndex={3} />
                <Station x={center[0] - 140} y={center[1] + 60} fill={0x8f1120} zIndex={3} />
                <Station x={center[0] - 100} y={center[1] + 100} fill={0x8f1120} zIndex={3} />
                <Station x={center[0] - 100} y={center[1] + 20} fill={0x8f1120} zIndex={3} />
                <StationHub
                    zIndex={2}
                    fill={0xffffff}
                    path={[
                        center[0] - 60,
                        center[1] + 60,
                        center[0] - 100,
                        center[1] + 20,
                        center[0] - 140,
                        center[1] + 60,
                        center[0] - 100,
                        center[1] + 100,
                    ]}
                />

                {/* Blue line */}
                <Line
                    fill={0x82becc}
                    path={[
                        [center[0] - 100, center[1] + 20],
                        [center[0] - 280, center[1] + 20],
                        [
                            center[0] - 280 + TORUS_LINE_CENTER * Math.cos(Math.radians(135)),
                            center[1] + 20 + TORUS_LINE_CENTER * Math.sin(Math.radians(135)),
                        ],
                    ]}
                />
                <Station
                    x={center[0] - 280 + TORUS_LINE_CENTER * Math.cos(Math.radians(135))}
                    y={center[1] + 20 + TORUS_LINE_CENTER * Math.sin(Math.radians(135))}
                    fill={0x8f1120}
                    zIndex={3}
                />

                {/* Purple line */}
                <Line
                    fill={0x753a78}
                    path={[
                        [
                            center[0] - 240 + 400 * Math.cos(Math.radians(135)),
                            center[1] + 60 + 400 * Math.sin(Math.radians(135)),
                        ],
                        [center[0] - 240, center[1] + 60],

                        kurskayaHanza,
                    ]}
                />

                <Station
                    x={kievskayaHanza[0] - 40}
                    y={kievskayaHanza[1] + 40}
                    fill={0x8f1120}
                    zIndex={3}
                />
                <Station
                    x={kievskayaHanza[0] - 40}
                    y={kievskayaHanza[1] - 40}
                    fill={0x8f1120}
                    zIndex={3}
                />
                <Station x={kievskayaHanza[0]} y={kievskayaHanza[1]} fill={0x8f1120} zIndex={3} />
                <Station x={kurskayaHanza[0]} y={kurskayaHanza[1]} fill={0x8f1120} zIndex={3} />

                {/* Salat line*/}
                <Line
                    x={kurskayaHanza[0]}
                    y={kurskayaHanza[1]}
                    fill={0xa5bd6a}
                    path={[
                        [
                            kurskayaHanza[0] +
                                (TORUS_LINE_CENTER + 50) * Math.cos(Math.radians(225)),
                            kurskayaHanza[1] +
                                (TORUS_LINE_CENTER + 50) * Math.sin(Math.radians(225)),
                        ],
                        [
                            kurskayaHanza[0] +
                                (TORUS_LINE_CENTER + 50) * Math.cos(Math.radians(225)),
                            kurskayaHanza[1] +
                                (TORUS_LINE_CENTER + 50) * Math.sin(Math.radians(225)) -
                                200,
                        ],
                    ]}
                />
                <Station
                    x={kurskayaHanza[0] + (TORUS_LINE_CENTER + 50) * Math.cos(Math.radians(225))}
                    y={kurskayaHanza[1] + (TORUS_LINE_CENTER + 50) * Math.sin(Math.radians(225))}
                    fill={0x8f1120}
                    zIndex={3}
                />

                {/* Orange line */}
                <Station x={prospektMira[0]} y={prospektMira[1]} fill={0x8f1120} zIndex={3} />
                <Line
                    x={prospektMira[0]}
                    y={50}
                    fill={0xf6593b}
                    path={[
                        [sretenskiyBulvar[0] + 40, center[1] + 100],
                        [oktyabrskaya[0], oktyabrskaya[1]],
                        [oktyabrskaya[0], oktyabrskaya[1] + 50],
                        [
                            oktyabrskaya[0] + TORUS_LINE_CENTER * Math.cos(Math.radians(135)),
                            oktyabrskaya[1] + 50 + TORUS_LINE_CENTER * Math.sin(Math.radians(135)),
                        ],
                    ]}
                />
                <Station
                    x={sretenskiyBulvar[0]}
                    y={sretenskiyBulvar[1]}
                    fill={0x8f1120}
                    zIndex={3}
                />
                <Station
                    x={prospektMira[0]}
                    y={sretenskiyBulvar[1] - 40}
                    fill={0x8f1120}
                    zIndex={3}
                />
                <Station
                    x={prospektMira[0]}
                    y={sretenskiyBulvar[1] + 40}
                    fill={0x8f1120}
                    zIndex={3}
                />
                <StationHub
                    zIndex={2}
                    fill={0xffffff}
                    path={[
                        sretenskiyBulvar[0],
                        sretenskiyBulvar[1],
                        prospektMira[0],
                        sretenskiyBulvar[1] - 40,
                        prospektMira[0],
                        sretenskiyBulvar[1] + 40,
                    ]}
                />
                <Station x={oktyabrskaya[0]} y={oktyabrskaya[1]} fill={0x8f1120} zIndex={3} />
                <Station
                    x={oktyabrskaya[0] + 35}
                    y={oktyabrskaya[1] - 30}
                    fill={0x8f1120}
                    zIndex={3}
                />
                <Station x={oktyabrskaya[0]} y={oktyabrskaya[1] + 50} fill={0x8f1120} zIndex={3} />
            </Container>
        </Stage>
    );
};

export default App;
