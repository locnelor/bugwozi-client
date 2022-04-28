import styled from 'styled-components'
import { css } from 'styled-components'
export const sizes = {
    xs: 480,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    xxl: 1600
}
export const media = (Object.keys(sizes) as (keyof typeof sizes)[])
    .reduce((acc, label) => {
        acc[label] = (s: TemplateStringsArray) => css`
        @media (min-width: ${sizes[label]}px) {
            ${css(s)}
        }
    `
        return acc
    }, {} as {
        [key in keyof typeof sizes]: (s: TemplateStringsArray) => ReturnType<typeof css>
    });
const Container = styled.div<{ padding?: number, flex?: boolean }>`
  position: relative;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  flex:1;
  box-sizing: border-box;
  padding-left: ${props => props.padding ? 20 : 0}px;
  padding-right: ${props => props.padding ? 20 : 0}px;
  display:${props => props.flex ? "flex" : "block"};
  ${media.md`
    max-width: 720px;
  `}
  ${media.lg`
    max-width: 960px;
  `}
  ${media.xl`
    max-width: 1152px;
  `}
  ${media.xxl`
    max-width: 1344px;
  `}
`
export default Container