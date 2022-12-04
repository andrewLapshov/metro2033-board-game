import { Container as RPFContainer } from 'react-pixi-fiber';
import { ComponentProps, useEffect, useRef } from 'react';

export const Container = ({ sortableChildren, ...props }: ComponentProps<typeof RPFContainer>) => {
    const containerRef = useRef<RPFContainer>(null);

    useEffect(() => {
        // для обхода бага с не выставляемым sortableChildren
        if (sortableChildren && containerRef.current && !containerRef.current?.sortableChildren) {
            containerRef.current.sortableChildren = true;
        }
    }, []);

    return <RPFContainer ref={containerRef} {...props} />;
};
