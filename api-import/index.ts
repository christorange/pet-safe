import fs from 'fs';
import { Octokit} from 'octokit';

type TrpcApiDist = {
  owner: string;
  repository: string;
  filePaths: ReadonlyArray<{
    sourcePath: string;
    targetPath: string;
  }>;
};

const TRPC_API_DIST: TrpcApiDist = {
  owner: 'christorange',
  repository: 'pet-safe-be',
  filePaths: [
    {
      sourcePath: 'api-export/dist/index.d.ts',
      targetPath: 'src/tRPC/api-types/index.d.ts'
    },
    {
      sourcePath: 'api-export/dist/index.js',
      targetPath: 'src/tRPC/api-types/index.js'
    }
  ]
} as const satisfies TrpcApiDist;

const apiImport = () => {
  const octokit = new Octokit({});
  
  TRPC_API_DIST.filePaths.map(async (trpcApiFilePath) => {
    const octokitResponse = await octokit.rest.repos.getContent({
      owner: TRPC_API_DIST.owner,
      repo: TRPC_API_DIST.repository,
      path: trpcApiFilePath.sourcePath,
    });

    if (!('content' in octokitResponse.data)) {
      throw Error(`Error: No content available to download - File ${trpcApiFilePath.sourcePath}.`);
    }

    const decodedFileContent = Buffer.from(octokitResponse.data.content, 'base64');

    fs.writeFileSync(trpcApiFilePath.targetPath, decodedFileContent);
  });

  console.log('### tRPC API successfully imported. ###');
}

apiImport();