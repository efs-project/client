# Ethereum File System (EFS)

> **Historical v1 sketch.** The active Client v2 architecture lives in the
> planning repository under `Designs/clientv2/`.

This document lays out the components and high level functions

## Components

### kernel

Handles wallet, device specific features

### libefs

Handles data access and caching

### libeas

Wraps official EAS library and contains additional functionality

### shell

Handles top level page UI, breadcrumbs, settings, and topic tree view

### apps

Request resources, visualize attestations

## Component Load order

Kernel --> libefs --> shell
