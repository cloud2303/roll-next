"use client"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/table'
import {useState, useEffect, useRef} from 'react'
import {Button} from "@/components/button";
import {clsx} from "clsx";
import {gsap} from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";


interface User {
    id: string
    order: number
    name: string
    email: string
}

export default function Home() {
    const [user, setUser] = useState(() => {
        return new Array(6).fill(0).map((_, index) => ({
            id: `${index}`,
            order: index,
            name: `测试${index}`,
            email: ""
        }))
    })

    return (
        <main className="flex flex-col min-h-screen justify-center items-center gap-28 p-24  md:flex-row">
            <Content users={user}/>
            <Roulette users={user}/>
        </main>
    )
}


function Content({users}: {
    users: User[]
}) {
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableHeader>顺序</TableHeader>
                    <TableHeader>姓名</TableHeader>
                </TableRow>
            </TableHead>
            <TableBody>
                {users.map((user) => (
                    <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.order}</TableCell>
                        <TableCell>{user.name}</TableCell>
                        {/* <TableCell className="text-zinc-500">{user.access}</TableCell> */}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}


function Roulette({users}: {
    users: User[]
}) {

    const [current, setCurrent] = useState(0);
    const userListRef = useRef(null);
    const userHeight = 50; // 用户项的高度
    const totalUsers = users.length;
    useEffect(() => {
        const translateY = -(current) * userHeight; // +1 因为有一个复制的元素在前面
        gsap.to(userListRef.current, {y: translateY, duration: 0.5, ease: "power2.out"});
    }, [current, totalUsers, userHeight]);


    const handleNext = () => {
        let next = (current+1) % (totalUsers);

        setCurrent(next);
    };

    return (
        <div className={"flex gap-4 items-center"}>

            <div  className={"overflow-hidden"} style={{height: `${userHeight}px`}}>
                <div className="user-list" ref={userListRef}>
                    {/* 正常元素 */}
                    {users.map((user, index) => (
                        <ListItem key={user.id} name={user.name} isCurrent={
                            index === current
                        }>

                        </ListItem>
                    ))}
                </div>
            </div>
            <div>
                <Button onClick={handleNext}>分配下一位</Button>
            </div>
        </div>
    );
}

function ListItem({name, isCurrent}: { name: string, isCurrent: Boolean }) {
    return (
        <div className={clsx("flex justify-center items-center  w-40 border border-gray-300 rounded-md h-[50px]",
            isCurrent ? "text-red-500" : ""
        )}>
            {name}
        </div>
    )
}
