import { Input, InputRef, Tag } from "antd"
import styled from "styled-components"
import PlusOutlined from "@ant-design/icons/PlusOutlined"
import { useCallback, useEffect, useRef, useState } from "react"
const StyledTag = styled(Tag)`
    margin:8px;
`
const TagInput = styled(Input)`
    width:78px;
    margin:8px;
    vertical-align: top;
`
const Tags = ({
    insert = true,
    value = [] as string[],
    onChange = (tags: string[]) => { },
    max = 10
}) => {
    const [visible, setVisible] = useState(false)
    const [tag, setTag] = useState("");
    const ref = useRef<InputRef>()
    const onClose = useCallback((name: string) => {
        onChange(value.filter((e: string) => e !== name));
    }, [value]);
    const handleInputConfirm = useCallback(() => {
        if (!!tag && value.length < max && !value.some((e: string) => e === tag)) {
            onChange([...value, tag]);
        }
        setTag("")
        setVisible(false)
    }, [tag, value]);
    const onClick = useCallback(() => setVisible(true), []);
    useEffect(() => {
        if (visible) ref.current?.focus()
    }, [visible])
    const onChangeTag = useCallback(({ target: { value } }) => setTag(value), [])
    return (
        <>
            {value.map(name => (
                <StyledTag
                    key={name}
                    closable
                    onClose={onClose.bind(null, name)}
                >
                    {name}
                </StyledTag>
            ))}
            {visible && insert && (
                <TagInput
                    ref={ref}
                    value={tag}
                    onBlur={handleInputConfirm}
                    onPressEnter={handleInputConfirm}
                    type="text"
                    size="small"
                    onChange={onChangeTag}
                />
            )}
            {!visible && insert && (
                <StyledTag className="site-tag-plus" onClick={onClick}>
                    <PlusOutlined /> 添加标签
                </StyledTag>
            )}
        </>
    )
}
export default Tags