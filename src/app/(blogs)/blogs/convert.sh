#!/bin/bash

# Function to add front matter to a file
add_front_matter() {
    local filename="$1"
    
    # Extract date from filename (assumes YYYY-MM-DD format at the start)
    date=$(echo "$filename" | grep -oP '^\d{4}-\d{2}-\d{2}')
    
    # Create generic title from filename (remove date and file extension)
    title=$(echo "$filename" | sed -E "s/^$date[_-]//; s/\.mdx$//; s/_/ /g; s/-/ /g")
    
    # Create the front matter
    front_matter="---
title: $title
date: $date
---

"

    # Temporarily store the existing content
    temp_file=$(mktemp)
    cat "$filename" > "$temp_file"

    # Add front matter to the file
    echo "$front_matter" > "$filename"
    cat "$temp_file" >> "$filename"

    # Remove temporary file
    rm "$temp_file"

    echo "Front matter added to $filename"
}

# Find and process all .mdx files
for file in *.mdx; do
    # Check if file exists (glob expansion)
    [ -e "$file" ] || continue
    
    add_front_matter "$file"
done