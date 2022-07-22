import { useCallback, useEffect, useRef } from "react"
import styled from "styled-components"
import { fileToImage, selectFile } from "../libs/utils/image"

const StyledCanvas = styled.canvas`
    border:1px dashed #ccc;
    cursor:pointer;
`

const Cover: React.FC<{
    onChange: (base64?: string) => void,
    initialValue: string,
    href?: string
}> = ({
    onChange,
    href,
    initialValue
}) => {
        const ref = useRef<HTMLCanvasElement>();
        const [width, height] = [200, 120];
        const clear = useCallback(() => {
            const car = ref.current.getContext("2d");
            car.clearRect(0, 0, width, height);
            car.font = "14px sans-serif"
            car.textAlign = "center";
            car.textBaseline = "middle";
            car.fillText("点击清除并选择图片", width / 2, height / 2)
        }, []);
        const onClick = useCallback(() => {
            clear();
            onChange()
            selectFile((file) => {
                fileToImage(file)
                    .then((img) => {
                        const car = ref.current.getContext("2d");
                        const h = img.height * (width / img.width)
                        car.drawImage(img, 0, (height - h) / 2, width, h);
                        onChange(ref.current.toDataURL("jpg"));
                    })
            })
        }, [onChange])
        useEffect(() => {
            clear();
            if (!href) return;
            //图片链接转base64后渲染到canvas
        }, [href]);
        useEffect(() => {
            if (!!initialValue) {
                try {
                    const img = new Image();
                    img.src = initialValue;
                    img.onload = () => {
                        const car = ref.current.getContext("2d");
                        car.drawImage(img, 0, 0);
                    }
                } catch (e) { }
            }
        }, [])
        return (
            <StyledCanvas
                onClick={onClick}
                ref={ref}
                width={width}
                height={height}
            />
        )
    }
export default Cover