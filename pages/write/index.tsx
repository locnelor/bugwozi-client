import { Button, Divider, Input, message, Switch } from "antd";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import styled from "styled-components";
import Container from "../../layout/Container";
import Page from "../../layout/Page";
import http from "../../libs/http";
import withPage from "../../libs/page/withPage";
import dynamic from "next/dynamic";
import { EditorState } from "draft-js";
import Tags from "../../components/Tags";
import Cover from "../../components/cover";
const RichEditor = dynamic(() => import("../../components/draftjs-richEditor/"), { ssr: false })
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

export default withPage(null, () => {
    const [title, setTitle] = useState<string>("");
    const [tags, setTags] = useState([]);
    const [cover, setCover] = useState<string>("");
    const [context, setContext] = useState<EditorState>();
    const [isPublic, setPublic] = useState(false);
    const onChangeTitle = useCallback(({ target: { value } }) => {
        if (value.length > 40) return;
        setTitle(value);
    }, []);
    const onClick = useCallback(() => {

    }, []);
    return (
        <Page>
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
                <RichEditor onChange={setContext} />
                <Divider />
                <h2>请添加标签 <StyledLabel>#还可以添加{10 - tags.length}个标签</StyledLabel> </h2>
                <Tags value={tags} onChange={setTags} />
                <StyledHeader>设置封面<StyledLabel>#可选</StyledLabel></StyledHeader>
                <Cover
                    onChange={setCover}
                />
                <StyledHeader> 是否公开</StyledHeader>
                <Switch checked={isPublic} onChange={setPublic} />
                <Divider dashed />
                <Button onClick={onClick}>
                    提交文章
                </Button>
            </StyledContainer>
        </Page>
    )
})