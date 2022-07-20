import { Button } from "antd"
import Link from "next/link";
import Account from "../type/account"
import UserOutlined from "@ant-design/icons/UserOutlined"
const UserButton: React.FC<{
    user: Account,
    back?: string
}> = ({
    user,
    back = "/"
}) => {
        if (!user) {
            return (
                <Link href={`/auth?back=${encodeURIComponent(back)}`} passHref>
                    <a>
                        <Button type="dashed">
                            <UserOutlined /> 注册 或 登录
                        </Button>
                    </a>
                </Link>
            )
        }
        return (
            <div>

            </div>
        )

    }
export default UserButton