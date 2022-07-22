import { Button, Divider, Input, message, Radio, Switch } from "antd";
import { useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import Container from "../layout/Container";
import dynamic from "next/dynamic";
import { convertToRaw, EditorState } from "draft-js";
import Tags from "../components/Tags";
import Cover from "../components/cover";
const RichEditor = dynamic(() => import("../components/draftjs-richEditor/"), { ssr: false })
const StyledTextarea = styled(Input.TextArea)`
    font-weight:700;
    font-size:26px;
    width:100%;
    outline:none;
    resize:none;
    border:0;
    margin-right:10px;
`
const StyledLabel = styled.label`
    font-size:14px;
    color:#808080;
    margin-left:10px;
`
const TitleContext = styled.div`
    display:flex;
    align-items:center;
    font-size:24px;
`
const StyledContainer = styled(Container)`
    background:#fff;
    margin-top:20px;
    margin-bottom:20px;
    max-width:800px;
    padding:20px;
`
const StyledHeader = styled.h2`
    margin-top:20px;
`
const articleTypeOptions = [{
    label: "单封面",
    value: "cover"
}, {
    label: "无封面",
    value: "none"
}];
export type pushArticleData = {
    title: string,
    subTitle: string,
    tags: string[],
    cover?: string,
    context: string,
    isPublic: boolean,
    type: string
}
const ArticleEditor: React.FC<{
    initialValue?: pushArticleData,
    onFinish: (data: pushArticleData) => void | Promise<void>
    okText?: string
}> = ({
    initialValue = {
        title: "",
        tags: [],
        type: "cover",
        subTitle: null,
        cover: null,
        isPublic: false,
        context: undefined
    },
    okText = "提交文章",
    onFinish
}) => {
        const [title, setTitle] = useState<string>(initialValue.title);
        const [tags, setTags] = useState(initialValue.tags);
        const [cover, setCover] = useState<string>(initialValue.cover);
        const [context, setContext] = useState<EditorState>();
        const [subTitle, setSubTitle] = useState(initialValue.subTitle);
        const [isPublic, setPublic] = useState(initialValue.isPublic);
        const [type, setType] = useState(initialValue.type);
        const [loading, setLoading] = useState(false);
        const onChangeTitle = useCallback(({ target: { value } }) => {
            if (value.length > 40) return;
            setTitle(value);
        }, []);
        const getContextText = useCallback(() => {
            const arr = context?.getCurrentContent().getBlocksAsArray();
            let text = [];
            for (let i = 0; !!arr && i < arr.length && text.length < 100; i++) {
                text.push(arr[i].getText().replaceAll(" ", ""));
            }
            return text.join(" ").slice(0, 100);
        }, [context]);
        const subTitleContext = useMemo(() => subTitle === null ? getContextText() : subTitle, [subTitle, context]);
        const onClick = useCallback(async () => {
            if (title.length > 4) return message.error("请输入至少四位标题");
            if (!subTitle) return message.error("副标题不得为空");
            if (!tags.length) return message.error("请至少输入一个标签");
            if (type === "cover" && !cover) return message.error("请选择封面");
            const options = {
                title,
                tags,
                cover: type === "cover" ? cover : null,
                context: JSON.stringify(convertToRaw(context.getCurrentContent())),
                isPublic,
                type,
                subTitle: subTitleContext
            }
            try {
                setLoading(true);
                await onFinish(options);
                setLoading(false);
            } catch (e) { }
        }, [title, tags, cover, subTitleContext, isPublic, type]);
        const onChangeType = useCallback((e) => {
            setType(e.target.value);
        }, []);
        const onChangeSubTitle = useCallback(({ target: { value } }) => setSubTitle(value), []);
        return (
            <StyledContainer>
                <TitleContext>
                    <StyledTextarea
                        placeholder="请输入标题"
                        value={title}
                        onChange={onChangeTitle}
                    />
                    {title.length}/40
                </TitleContext>
                <Divider />
                <RichEditor initialValue={initialValue.context} onChange={setContext} />
                <Divider />
                <h2>副标题</h2>
                <Input.TextArea
                    maxLength={100}
                    value={subTitleContext}
                    showCount
                    onChange={onChangeSubTitle}
                />
                <StyledHeader>请添加标签 <StyledLabel>#还可以添加{10 - tags.length}个标签</StyledLabel> </StyledHeader>
                <Tags value={tags} onChange={setTags} />
                <StyledHeader>选择封面</StyledHeader>
                <Radio.Group
                    value={type}
                    onChange={onChangeType}
                    options={articleTypeOptions}
                />
                <Divider dashed />
                {type === "cover" && <Cover initialValue={cover} onChange={setCover} />}
                <StyledHeader> 是否公开</StyledHeader>
                <Switch checked={isPublic} onChange={setPublic} />
                <Divider dashed />
                <Button loading={loading} onClick={onClick}>
                    {okText}
                </Button>
            </StyledContainer>
        )
    };
export default ArticleEditor