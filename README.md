## usersテーブル

|Column|Type|Option|
|------|----|------|
|nickname|string|null: false|
|email|string|null: false|
|passwrod|string|null: false|

### Association
- has_many :posts
- has_many :gruops_users
- has_many :groups, through: :groups_users

## groupsテーブル

|Column|Type|Option|
|------|----|------|
|name|string|null: false|

### Association
- has_many :messages
- has_many :groups_user
- has_many :users, through: :groups_users

## messagesテーブル

|Column|Type|Option|
|------|----|------|
|body|text||
|image|string||
|group_id|integer|null: false,foreign_key: true|
|user_id|integer|null: false,foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user
