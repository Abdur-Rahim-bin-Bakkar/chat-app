"use client";

import { useState, useEffect } from "react";
import { useChatStore } from "@/store/useChatStore";
import { Search, Edit, Users, MessageSquare, Plus, X, User as UserIcon } from "lucide-react";
import { api, User } from "@/services/api";
import { formatDistanceToNow } from "date-fns";

export default function Sidebar() {
  const { currentUser, conversations, activeConversation, setActiveConversation, startDirectConversation, createGroup, logout } = useChatStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isCreatingGroup, setIsCreatingGroup] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  useEffect(() => {
    const handleSearch = async () => {
      if (!searchQuery.trim()) {
        setSearchResults([]);
        return;
      }
      const users = await api.users.search(searchQuery);
      setSearchResults(users.filter((u: User) => (u.id || u._id) !== (currentUser?.id || currentUser?._id)));
    };

    const debounce = setTimeout(handleSearch, 300);
    return () => clearTimeout(debounce);
  }, [searchQuery, currentUser]);

  const handleStartChat = async (user: User) => {
    if (isCreatingGroup) {
      if (!selectedUsers.find(u => (u.id || u._id) === (user.id || user._id))) {
        setSelectedUsers([...selectedUsers, user]);
      }
    } else {
      await startDirectConversation(user._id || user.id || '');
      setSearchQuery("");
      setSearchResults([]);
    }
  };

  const handleCreateGroup = async () => {
    if (selectedUsers.length > 0 && groupName.trim()) {
      await createGroup(
        selectedUsers.map(u => u._id || u.id || ''),
        groupName.trim()
      );
      setIsCreatingGroup(false);
      setGroupName("");
      setSelectedUsers([]);
      setSearchQuery("");
    }
  };

  return (
    <div className="flex h-full w-80 flex-col border-r border-gray-200 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-700 font-bold">
            {currentUser?.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="font-semibold text-gray-900">{currentUser?.name}</h2>
            <button onClick={logout} className="text-xs text-gray-500 hover:text-red-600 transition-colors">
              Log out
            </button>
          </div>
        </div>
        <button 
          onClick={() => setIsCreatingGroup(!isCreatingGroup)}
          className="rounded-full p-2 text-gray-500 hover:bg-gray-100 transition-colors"
          title="New Group"
        >
          {isCreatingGroup ? <X className="h-5 w-5" /> : <Edit className="h-5 w-5" />}
        </button>
      </div>

      {/* Group Creation UI */}
      {isCreatingGroup && (
        <div className="border-b border-gray-200 bg-blue-50/50 p-4">
          <h3 className="mb-3 text-sm font-medium text-gray-700">Create New Group</h3>
          <input
            type="text"
            placeholder="Group Name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            className="mb-3 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
          />
          {selectedUsers.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-2">
              {selectedUsers.map(u => (
                <span key={u.id || u._id} className="flex items-center gap-1 rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-700">
                  {u.name}
                  <button onClick={() => setSelectedUsers(selectedUsers.filter(s => s.id !== u.id))}>
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
          <button
            onClick={handleCreateGroup}
            disabled={!groupName.trim() || selectedUsers.length === 0}
            className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
          >
            Create Group
          </button>
        </div>
      )}

      {/* Search */}
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearching(true)}
            className="w-full rounded-full bg-gray-100 py-2 pl-9 pr-4 text-sm outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto">
        {searchQuery ? (
          <div className="p-2">
            <h3 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
              Search Results
            </h3>
            {searchResults.length === 0 ? (
              <p className="px-2 text-sm text-gray-500">No users found.</p>
            ) : (
              searchResults.map((user) => (
                <button
                  key={user.id || user._id}
                  onClick={() => handleStartChat(user)}
                  className="flex w-full items-center gap-3 rounded-lg p-2 text-left hover:bg-gray-100"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200">
                    <UserIcon className="h-5 w-5 text-gray-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.phone}</p>
                  </div>
                  {isCreatingGroup && (
                    <Plus className="ml-auto h-4 w-4 text-gray-400" />
                  )}
                </button>
              ))
            )}
          </div>
        ) : (
          <div className="p-2">
            <h3 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
              Conversations
            </h3>
            {conversations.length === 0 ? (
              <div className="p-4 text-center">
                <MessageSquare className="mx-auto mb-2 h-8 w-8 text-gray-300" />
                <p className="text-sm text-gray-500">No conversations yet.</p>
                <p className="text-xs text-gray-400">Search for users to start chatting.</p>
              </div>
            ) : (
              // Ensure we don't mutate state during render, slice to copy, then sort
              [...conversations].sort((a, b) => {
                const dateA = a.lastMessage ? new Date(a.lastMessage.createdAt || Date.now()).getTime() : 0;
                const dateB = b.lastMessage ? new Date(b.lastMessage.createdAt || Date.now()).getTime() : 0;
                return dateB - dateA;
              }).map((conv) => {
                const otherParticipant = conv.isGroup ? null : conv.participants.find(p => p.id !== currentUser?.id);
                const title = conv.isGroup ? conv.name : otherParticipant?.name;
                const isActive = activeConversation?.id === conv.id;

                return (
                  <button
                    key={conv.id}
                    onClick={() => setActiveConversation(conv)}
                    className={`flex w-full items-center gap-3 rounded-lg p-3 text-left transition-colors ${
                      isActive ? "bg-blue-50" : "hover:bg-gray-50"
                    }`}
                  >
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${conv.isGroup ? 'bg-indigo-100' : 'bg-gray-200'}`}>
                      {conv.isGroup ? (
                        <Users className="h-6 w-6 text-indigo-600" />
                      ) : (
                        <span className="font-medium text-gray-600 text-lg">{title?.charAt(0).toUpperCase()}</span>
                      )}
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <div className="flex justify-between items-baseline mb-0.5">
                        <p className={`truncate text-sm font-medium ${isActive ? 'text-blue-900' : 'text-gray-900'}`}>{title}</p>
                        {conv.lastMessage && (
                          <span className="text-[10px] text-gray-500 shrink-0 ml-2">
                            {formatDistanceToNow(new Date(conv.lastMessage.createdAt || Date.now()), { addSuffix: true })}
                          </span>
                        )}
                      </div>
                      <p className={`truncate text-xs ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
                        {conv.lastMessage ? conv.lastMessage.text : "New conversation"}
                      </p>
                    </div>
                    {(conv.unreadCount || 0) > 0 && (
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
                        {conv.unreadCount}
                      </div>
                    )}
                  </button>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
}
