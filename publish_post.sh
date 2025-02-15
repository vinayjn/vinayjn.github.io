#!/bin/zsh

# $1 will be the draft file path
# $2 will be the destination file path

# Check if arguments are provided

echo "Changing directory to blog"

cd /home/vj/workspace/blog

if [ $# -ne 2 ]; then
    echo "Error: Required arguments missing"
    echo "Usage: $0 <draft_path> <destination_path>"
    exit 1
fi

DRAFT_PATH="$1"
DEST_PATH="$2"

# Create destination directory if it doesn't exist
mkdir -p "$(dirname "$DEST_PATH")"

# Move the draft to the destination
mv "$DRAFT_PATH" "$DEST_PATH"


git add .
git commit -m "Published new post: $(basename "$DEST_PATH")"

# if the command below fails then move the file back to the drafts folder and return an error

make publish

if [ $? -ne 0 ]; then
    mv "$DEST_PATH" "$(dirname "$DRAFT_PATH")"
        echo "Failed to publish post"
    exit 1
fi

echo "Published successfully to $DEST_PATH" && exit 0