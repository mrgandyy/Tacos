'use client'

import { updateUserRole, deleteUserProfile } from '@/app/actions/admin'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from '@/components/ui/input'
import { Search, Loader2, Trash2, Shield, User, Disc, Users } from 'lucide-react'
import { useState } from 'react'

export function UserManagement({ users }: { users: any[] }) {
    const [searchTerm, setSearchTerm] = useState('')
    const [loadingMap, setLoadingMap] = useState<Record<string, boolean>>({})

    const filteredUsers = users.filter((user) =>
        user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.id.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleRoleChange = async (userId: string, newRole: string) => {
        setLoadingMap(prev => ({ ...prev, [userId]: true }))
        try {
            await updateUserRole(userId, newRole)
        } catch (e) {
            console.error(e)
            alert('Failed to update role')
        } finally {
            setLoadingMap(prev => ({ ...prev, [userId]: false }))
        }
    }

    const handleDelete = async (userId: string) => {
        setLoadingMap(prev => ({ ...prev, [userId]: true }))
        try {
            await deleteUserProfile(userId)
        } catch (e) {
            console.error(e)
            alert('Failed to delete user')
        } finally {
            setLoadingMap(prev => ({ ...prev, [userId]: false }))
        }
    }

    return (
        <div className="space-y-4">
            <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                <Input
                    placeholder="Search users by name or ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 bg-zinc-950 border-zinc-800"
                />
            </div>

            <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-zinc-800 hover:bg-zinc-900/50">
                                <TableHead className="text-zinc-400">User</TableHead>
                                <TableHead className="text-zinc-400">Role</TableHead>
                                <TableHead className="text-zinc-400">Status</TableHead>
                                <TableHead className="text-zinc-400">Groups</TableHead>
                                <TableHead className="text-right text-zinc-400">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredUsers.map((user) => (
                                <TableRow key={user.id} className="border-zinc-800 hover:bg-zinc-800/50">
                                    <TableCell className="flex items-center gap-3">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src={user.avatar_url} />
                                            <AvatarFallback>{user.username?.slice(0, 2).toUpperCase()}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col">
                                            <span className="font-medium text-white">{user.username}</span>
                                            <span className="text-xs text-zinc-500 font-mono">{user.id.slice(0, 8)}...</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Select
                                            value={user.role}
                                            onValueChange={(val: string) => handleRoleChange(user.id, val)}
                                            disabled={loadingMap[user.id]}
                                        >
                                            <SelectTrigger className="w-[130px] h-8 bg-zinc-950 border-zinc-700 text-xs">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent className="bg-zinc-900 border-zinc-800">
                                                <SelectItem value="public">
                                                    <div className="flex items-center gap-2">
                                                        <User className="w-3 h-3" /> Public
                                                    </div>
                                                </SelectItem>
                                                <SelectItem value="dj">
                                                    <div className="flex items-center gap-2">
                                                        <Disc className="w-3 h-3 text-purple-400" /> DJ
                                                    </div>
                                                </SelectItem>
                                                <SelectItem value="partner">
                                                    <div className="flex items-center gap-2">
                                                        <Users className="w-3 h-3 text-pink-400" /> Partner
                                                    </div>
                                                </SelectItem>
                                                <SelectItem value="admin">
                                                    <div className="flex items-center gap-2">
                                                        <Shield className="w-3 h-3 text-red-500" /> Admin
                                                    </div>
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </TableCell>
                                    <TableCell>
                                        {user.application_status !== 'none' && (
                                            <Badge variant="outline" className={`text-xs capitalize ${user.application_status === 'approved' ? 'border-green-500/50 text-green-500' :
                                                user.application_status === 'rejected' ? 'border-red-500/50 text-red-500' :
                                                    'border-yellow-500/50 text-yellow-500'
                                                }`}>
                                                {user.application_status}
                                            </Badge>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {user.partnered_groups && user.partnered_groups.length > 0 ? (
                                            <div className="flex flex-col gap-1">
                                                {user.partnered_groups.map((g: any) => (
                                                    <Badge key={g.id} variant="secondary" className="w-fit text-[10px] bg-zinc-800 text-zinc-300">
                                                        {g.name}
                                                    </Badge>
                                                ))}
                                            </div>
                                        ) : (
                                            <span className="text-zinc-600 text-xs">-</span>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-8 w-8 p-0 text-zinc-500 hover:text-red-500 hover:bg-red-500/10"
                                                    disabled={loadingMap[user.id]}
                                                >
                                                    {loadingMap[user.id] ? (
                                                        <Loader2 className="h-4 w-4 animate-spin" />
                                                    ) : (
                                                        <Trash2 className="h-4 w-4" />
                                                    )}
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent className="bg-zinc-900 border-zinc-800">
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle className="text-white">Delete User Profile?</AlertDialogTitle>
                                                    <AlertDialogDescription className="text-zinc-400">
                                                        This will properly delete the user's profile and data from the public view.
                                                        They will need to sign up again to restore access.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel className="bg-transparent border-zinc-700 text-white hover:bg-zinc-800">Cancel</AlertDialogCancel>
                                                    <AlertDialogAction
                                                        className="bg-red-600 text-white hover:bg-red-700 border-none"
                                                        onClick={() => handleDelete(user.id)}
                                                    >
                                                        Delete User
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
