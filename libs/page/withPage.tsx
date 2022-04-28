import { memo, useMemo } from "react"
import { useStoreState } from "../store";




const withPage = function (
    ComponentLayout: React.FC<any>,
    Component: React.FC
) {
    const Layout = memo(ComponentLayout);
    const WithPage = ({ _store, ...rest }: any) => {
        const {
            action: {
                merge
            }
        } = useStoreState()
        merge(_store);
        return (
            <Layout>
                <Component {...rest} />
            </Layout>
        )
    }

    return WithPage
}
export default withPage