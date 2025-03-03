# Contributing to Lurk

We want to make contributing to this project as easy and transparent as possible.

## Pull Requests
If you want to contribute a bug fix or feature to lurk, here's how to proceed:

1. Fork the repo and create your branch from `main`.
2. If you've added code that should be tested, add tests.
3. If you've changed APIs, update the documentation.
4. Ensure the test suite passes.
5. Submit your pull-request, writing a clear description of its intended purpose, and linking any issues it addresses

## Pull Request reviews

The maintainers will review your pull request as soon as they can, and it can only be merged once it has at least one approval. The comments can be in several forms:

- 'Comment' usually indicates the reviewer doesn't yet commit to approving your code but has important remarks to contribute.
- 'Request Changes' means changes need to be made before the reviewer approves at all.
- 'Approve' can be of two forms depending on the exact nature of the comments:
    -  Approval with no restrictions, or non-blocking comments indicates this can be merged by a maintainer.
    -  Approval with explicitly marked blocking comments means: "I don't need to review this again, but I need you (and trust you) to fix these issues first."

## Merging a Pull-request

A pull-request must meet certain criteria before it can be merged.

1. If you are fine with a squash merge, your pull-request's final commit should have at least one approval from a reviewer, and from all maintainers listed in the .github/CODEOWNERS file for the touched code sections.
2. If you prefer a classic merge, the pull-request should meet the above conditions, and it should be a fast-forward merge from main, which implies it must also be up-to-date.

**Warning:** An up-to-date, rebased branch is required for a fast-forward merge. This means that your branch should not contain any merge commits: while we do not object to `Merge` as a pull-request merge method, we prefer the pull-request's history to be linear. To achieve this, you can update your local branch with `git pull --rebase` (see [doc](https://www.git-scm.com/docs/git-pull)).

A maintainer will merge your pull-request (or their own) using one of the following methods:
1.  The [GitHub's merge queue](https://github.blog/changelog/2023-02-08-pull-request-merge-queue-public-beta/) with a squash merge strategy. This is the simplest workflow and always acceptable if you don't mind having a single commit.
2.  If your commit history is carefully cleaned to remove unnecessary commits and ensure that each retained commit is meaningful, a repo admin may use the 'Merge' strategy.

Please feel free to specify your preferred merge method in your PR summary.

The implemented workflow is represented below, with rounded corners and dotted lines automatically handled by Github's merge queue:
```mermaid
flowchart TD
    Review{Is *last commit* of PR reviewed by CODEOWNERS?} -->|Yes| Squash
    Review --> |No| GReview[Get fresh review]
    GReview --> Review

    Squash{Are you OK with Squash merge?} -->|Yes| MQueue(Merge queue)
    Squash --> |No| Update{Is PR Up to date?}

    Update --> |Yes| Merge[Get a maintainer to merge it for you!]
    Update --> |No| Rebase[Rebase & get fresh review]
    Rebase --> Review

    Merge --> |It worked| Celebrate
    Merge --> |Somebody pushed to main before maintainer| Rebase

    MQueue -.-> |PR squash-merges cleanly on main & passes CI| Celebrate
    MQueue -.-> |Github merge queue found squash-merge or CI issue| Rebase
```

**Note:** In exceptional cases, we may preserve some messy commit history if not doing so would lose too much important information and fully disentangling is too difficult. We expect this would rarely apply.

## Issues
We use GitHub issues to track public bugs. Please ensure your description is clear and has sufficient instructions to be able to reproduce the issue.

## Lurk-beta Repository Organization and Dependency Management

Welcome to the Lurk-beta project! Here's an introduction to the branch organization and the chain of dependencies in the Lurk-beta repository.

### Major Dependencies

The main repo is [lurk-beta](https://github.com/argumentcomputer/lurk-beta) with major dependencies:

- [bellpepper](https://github.com/argumentcomputer/bellpepper)
- [neptune](https://github.com/argumentcomputer/neptune)
- [arecibo](https://github.com/argumentcomputer/arecibo) - a fork of the upstream repo [nova](https://github.com/microsoft/Nova)

### Forked Dependencies

Additionally, Lurk-beta depends on the following forked repositories:

- [pasta_curves](https://github.com/argumentcomputer/pasta_curves) (forked from [zcash/pasta_curves](https://github.com/zcash/pasta_curves))
- [pasta-msm](https://github.com/argumentcomputer/pasta-msm) (forked from [supranational/pasta-msm](https://github.com/supranational/pasta-msm))
- [ec-gpu](https://github.com/argumentcomputer/ec-gpu) (forked from [filecoin-project/ec-gpu](https://github.com/filecoin-project/ec-gpu))

For rapid iterations and to address issues in these dependencies, Lurk's **main** branch directly depends on the **dev** branch of its dependencies (transitively).

### Branch Management (forked dependencies)

- **Main Branch:** For repositories with an upstream, our main branch always mirrors the upstream. Never make direct changes here as they would be overwritten.
  
- **Dev Branch:** Contains bleeding-edge changes on top of the upstream repository. Always ahead of the main branch.

### Branch management (source repositories)

- **Main:** Stable branch for repositories where we're the source of truth and have regular releases (e.g., bellpepper and neptune).
  
- **Dev:** Contains rapid developments and updates.

### Where to Make Changes?
- For integration in a release: target the **main** branch.
  
- For immediate development integration: target the **dev** branch. Do note, changes here get picked up upstream. CI processes ensure Lurk's compatibility with these changes.

## Dependency Diagram

```mermaid
graph TD
    LURK[lurk-beta] --> BELL[bellpepper]
    LURK --> NEPT[neptune]
    LURK --> AREC[arecibo]
    AREC --> NOVA[nova]
    LURK --> PASTA_CURVES[pasta_curves]
    PASTA_CURVES --> ZCASH_PASTA[zcash/pasta_curves]
    LURK --> PASTA_MSM[pasta-msm]
    PASTA_MSM --> SUPRA_PASTA[supranational/pasta-msm]
    LURK --> EC_GPU[ec-gpu]
    EC_GPU --> FILECOIN_EC[filecoin-project/ec-gpu]
```


## For maintainers: Benchmarking

To trigger a benchmark:

1. Click on the Actions tab in the upper part of the Github UI
2. Click on the "Benchmarking" section of the left-hand bar
3. Click on the "Run workflow" pulldown button on the right
4. Select the branch you want to benchmark, and click on the green "Run workflow" button to benchmark.

Then, check the following link for the benchmark reports:

https://argumentcomputer.github.io/lurk-beta/benchmarks/criterion/reports/

Ask a maintainer for a benchmark report if you can't find a recent one.

## License
By contributing to `lurk-beta`, you agree that your contributions will be licensed under both [MIT](https://opensource.org/license/MIT) and [Apache 2.0](http://www.apache.org/licenses/LICENSE-2.0) licenses.
